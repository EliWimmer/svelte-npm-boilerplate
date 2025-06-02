export class MarkdownParser {
    options;
    constructor(options = {}) {
        this.options = {
            sanitizeHtml: true,
            allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'em', 'u', 'del', 'a', 'img', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre'],
            escapeHtml: true,
            variables: {},
            ...options
        };
    }
    parse(markdown) {
        if (!markdown)
            return '';
        let html = markdown;
        // Normalize line endings
        html = html.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        // Process variables first (before any other parsing)
        html = this.parseVariables(html);
        // Process block elements first
        html = this.parseCodeBlocks(html);
        html = this.parseBlockquotes(html);
        html = this.parseHeaders(html);
        html = this.parseLists(html);
        html = this.parseHorizontalRules(html);
        // Process inline elements
        html = this.parseInlineCode(html);
        html = this.parseImages(html);
        html = this.parseLinks(html);
        html = this.parseBold(html);
        html = this.parseItalic(html);
        html = this.parseStrikethrough(html);
        html = this.parseLineBreaks(html);
        // Convert remaining newlines to paragraphs
        html = this.parseParagraphs(html);
        // Clean up extra whitespace
        html = html.replace(/\n\s*\n/g, '\n').trim();
        return html;
    }
    /**
     * Parse variables in the format {{key|default}}
     * - If key exists in variables, use its value
     * - If key doesn't exist but default is provided, use default
     * - If neither exists, replace with empty string
     *
     * Examples:
     * - {{name|Guest}} with variables = {name: "John"} → "John"
     * - {{name|Guest}} with variables = {} → "Guest"
     * - {{name}} with variables = {} → ""
     */
    parseVariables(text) {
        // Replace {{key|default}} syntax with variable values
        return text.replace(/\{\{([^}|]+)(\|([^}]*))?\}\}/g, (match, key, defaultPart, defaultValue) => {
            const trimmedKey = key.trim();
            const variables = this.options.variables || {};
            // Check if the variable exists
            if (variables.hasOwnProperty(trimmedKey)) {
                return variables[trimmedKey];
            }
            // Use default value if provided
            if (defaultValue !== undefined) {
                return defaultValue;
            }
            // If no default provided, return empty string
            return '';
        });
    }
    escapeHtml(text) {
        if (!this.options.escapeHtml)
            return text;
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    parseCodeBlocks(text) {
        // Fenced code blocks with language
        text = text.replace(/```(\w+)?\n([\s\S]*?)\n```/g, (match, lang, code) => {
            const escapedCode = this.escapeHtml(code);
            const langClass = lang ? ` class="language-${lang}"` : '';
            return `<pre><code${langClass}>${escapedCode}</code></pre>`;
        });
        // Indented code blocks (4 spaces or tab, but only if the line has content after the indent)
        text = text.replace(/^( {4}|\t)(.+)$/gm, (match, indent, code) => {
            // Only treat as code block if there's actual content after the indentation
            if (code.trim()) {
                return `<pre><code>${this.escapeHtml(code)}</code></pre>`;
            }
            return match; // Return original if just whitespace
        });
        return text;
    }
    parseInlineCode(text) {
        return text.replace(/`([^`]+)`/g, (match, code) => {
            return `<code>${this.escapeHtml(code)}</code>`;
        });
    }
    parseHeaders(text) {
        // ATX headers (# ## ### etc.)
        text = text.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, content) => {
            const level = hashes.length;
            return `<h${level}>${content.trim()}</h${level}>`;
        });
        // Setext headers (underlined with = or -)
        text = text.replace(/^(.+)\n=+$/gm, '<h1>$1</h1>');
        text = text.replace(/^(.+)\n-+$/gm, '<h2>$1</h2>');
        return text;
    }
    parseBlockquotes(text) {
        return text.replace(/^>\s*(.+)$/gm, '<blockquote>$1</blockquote>');
    }
    parseHorizontalRules(text) {
        return text.replace(/^(?:---|\*\*\*|___)$/gm, '<hr>');
    }
    parseLists(text) {
        const lines = text.split('\n');
        const result = [];
        let inList = false;
        let currentListType = null;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            // Check if this is a list item
            const unorderedMatch = line.match(/^[\*\-\+]\s+(.+)$/);
            const orderedMatch = line.match(/^\d+\.\s+(.+)$/);
            if (unorderedMatch) {
                // Start or continue unordered list
                if (!inList || currentListType !== 'ul') {
                    if (inList) {
                        result.push(`</${currentListType}>`);
                    }
                    result.push('<ul>');
                    inList = true;
                    currentListType = 'ul';
                }
                result.push(`<li>${unorderedMatch[1]}</li>`);
            }
            else if (orderedMatch) {
                // Start or continue ordered list
                if (!inList || currentListType !== 'ol') {
                    if (inList) {
                        result.push(`</${currentListType}>`);
                    }
                    result.push('<ol>');
                    inList = true;
                    currentListType = 'ol';
                }
                result.push(`<li>${orderedMatch[1]}</li>`);
            }
            else {
                // Not a list item - close any open list
                if (inList) {
                    result.push(`</${currentListType}>`);
                    inList = false;
                    currentListType = null;
                }
                result.push(line);
            }
        }
        // Close any remaining open list
        if (inList) {
            result.push(`</${currentListType}>`);
        }
        return result.join('\n');
    }
    parseImages(text) {
        // ![alt text](url "optional title")
        return text.replace(/!\[([^\]]*)\]\(([^)]+)(?:\s+"([^"]*)")?\)/g, (match, alt, src, title) => {
            const titleAttr = title ? ` title="${title}"` : '';
            return `<img src="${src}" alt="${alt}"${titleAttr}>`;
        });
    }
    parseLinks(text) {
        // [link text](url "optional title")
        return text.replace(/\[([^\]]+)\]\(([^)]+)(?:\s+"([^"]*)")?\)/g, (match, text, url, title) => {
            const titleAttr = title ? ` title="${title}"` : '';
            return `<a href="${url}"${titleAttr}>${text}</a>`;
        });
    }
    parseBold(text) {
        // **bold** or __bold__
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
        return text;
    }
    parseItalic(text) {
        // *italic* or _italic_ (but not inside words)
        text = text.replace(/(?<!\w)\*(.+?)\*(?!\w)/g, '<em>$1</em>');
        text = text.replace(/(?<!\w)_(.+?)_(?!\w)/g, '<em>$1</em>');
        return text;
    }
    parseStrikethrough(text) {
        // ~~strikethrough~~
        return text.replace(/~~(.+?)~~/g, '<del>$1</del>');
    }
    parseLineBreaks(text) {
        // Two or more spaces at end of line create a line break
        return text.replace(/  +\n/g, '<br>\n');
    }
    parseParagraphs(text) {
        // Split by double newlines and wrap non-empty, non-html lines in <p> tags
        const paragraphs = text.split(/\n\s*\n/);
        return paragraphs
            .map(paragraph => {
            paragraph = paragraph.trim();
            if (!paragraph)
                return '';
            // Don't wrap if it's already HTML block element
            if (paragraph.match(/^<(h[1-6]|blockquote|ul|ol|pre|hr|div)/)) {
                return paragraph;
            }
            return `<p>${paragraph}</p>`;
        })
            .filter(p => p)
            .join('\n');
    }
}
// Export a simple function for quick usage
export function parseMarkdown(markdown, options) {
    const parser = new MarkdownParser(options);
    return parser.parse(markdown);
}
// Export the default parser instance
export const markdownParser = new MarkdownParser();
