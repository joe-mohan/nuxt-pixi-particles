import dompurify from 'isomorphic-dompurify'
import { marked } from 'marked'

export default function useParse (string) {
  return string ? dompurify.sanitize(marked.parse(string, { mangle: false, headerIds: false })) : ''
}
