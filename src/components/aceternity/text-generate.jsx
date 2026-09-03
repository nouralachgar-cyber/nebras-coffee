import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function TextGenerateEffect({ words, className, filter = true, duration = 0.5 }) {
  const wordsArray = words.split(" ")
  return (
    <div className={cn("font-bold", className)}>
      <motion.div>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="inline-block"
            initial={{ opacity: 0, filter: filter ? "blur(10px)" : "none" }}
            animate={{ opacity: 1, filter: filter ? "blur(0px)" : "none" }}
            transition={{ duration: duration, delay: idx * 0.08 }}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

export function Typewriter({ text, className, speed = 35 }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {text}
    </motion.p>
  )
}
