interface MarkdownParseOptions {
    sanitizeHtml?: boolean;
    allowedTags?: string[];
    escapeHtml?: boolean;
    variables?: Record<string, string>;
}
export declare class MarkdownParser {
    private options;
    constructor(options?: MarkdownParseOptions);
    parse(markdown: string): string;
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
    private parseVariables;
    private escapeHtml;
    private parseCodeBlocks;
    private parseInlineCode;
    private parseHeaders;
    private parseBlockquotes;
    private parseHorizontalRules;
    private parseLists;
    private parseImages;
    private parseLinks;
    private parseBold;
    private parseItalic;
    private parseStrikethrough;
    private parseLineBreaks;
    private parseParagraphs;
}
export declare function parseMarkdown(markdown: string, options?: MarkdownParseOptions): string;
export declare const markdownParser: MarkdownParser;
export {};
