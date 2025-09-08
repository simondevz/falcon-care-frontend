/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { cn } from "@/lib/utils";

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div
      className={cn("prose prose-sm max-w-none dark:prose-invert", className)}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Custom heading styles
          h1: ({ children }) => (
            <h1 className="text-xl font-bold mb-3 text-foreground border-b pb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-semibold mb-2 text-foreground">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-md font-medium mb-2 text-foreground">
              {children}
            </h3>
          ),

          // Custom paragraph styles
          p: ({ children }) => (
            <p className="mb-3 text-sm text-foreground leading-relaxed">
              {children}
            </p>
          ),

          // Custom list styles
          ul: ({ children }) => (
            <ul className="mb-3 ml-4 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-3 ml-4 space-y-1">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-sm text-foreground">{children}</li>
          ),

          // Custom blockquote styles
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/30 pl-4 my-3 italic text-muted-foreground bg-muted/30 py-2 rounded-r">
              {children}
            </blockquote>
          ),

          // Custom code styles
          code: (props) => {
            const { node, inline, className, children, ...rest } = props as any;
            if (inline) {
              return (
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-primary">
                  {children}
                </code>
              );
            }
            return (
              <code
                className="block bg-muted p-3 rounded-md text-xs font-mono overflow-x-auto"
                {...rest}
              >
                {children}
              </code>
            );
          },

          // Custom pre styles (for code blocks)
          pre: ({ children }) => (
            <pre className="bg-muted border rounded-md p-3 mb-3 overflow-x-auto">
              {children}
            </pre>
          ),

          // Custom table styles
          table: ({ children }) => (
            <div className="overflow-x-auto mb-3">
              <table className="min-w-full border border-border rounded-md">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border px-3 py-2 bg-muted font-medium text-left">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-3 py-2 text-sm">
              {children}
            </td>
          ),

          // Custom link styles
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-primary hover:text-primary/80 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),

          // Custom strong/bold styles
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          ),

          // Custom emphasis/italic styles
          em: ({ children }) => (
            <em className="italic text-foreground">{children}</em>
          ),

          // Custom horizontal rule
          hr: () => <hr className="my-4 border-border" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
