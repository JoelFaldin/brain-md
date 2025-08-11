import React, { useRef, useState } from "react"

const EditorPanel = () => {
  const [text, setText] = useState('')

  const textAreaRef = useRef(null)
  const lineNumbersRef = useRef<HTMLDivElement>(null)

  const lineNumbers = text.split('\n').map((_, index) => index + 1).join('\n')

  const syncScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current && textAreaRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  }

  return (
    <div className="flex-1 p-8 overflow-hidden relative">

      <div className="flex w-full h-full p-4 overflow-y-auto rounded-lg shadow">
          <div
            ref={lineNumbersRef}
            className="text-right pr-4 text-gray-400 dark:text-gray-500 text-lg leading-relaxed font-mono overflow-hidden resize-none"
            style={{ width: '2em' }}
          >
          {lineNumbers}
        </div>

        <textarea
          ref={textAreaRef}
          className="flex-1 resize-none outline-none text-lg leading-relaxed bg-transparent font-mono"
          placeholder="Start typing now..."
          value={text}
          onChange={e => setText(e.target.value)}
          onScroll={syncScroll}
          rows={lineNumbers.split('\n').length}
        >
          
        </textarea>
      </div>

    </div>
  )
}

export default EditorPanel