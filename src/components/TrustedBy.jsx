"use client"

import { useEffect, useRef } from "react"

export default function TrustedBy() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.2 },
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const logos = [
    { name: "TechFlow", letters: "TF" },
    { name: "Innovatech", letters: "IN" },
    { name: "DataPro", letters: "DP" },
    { name: "CloudSync", letters: "CS" },
    { name: "SmartBiz", letters: "SB" },
    { name: "NextGen", letters: "NG" },
  ]

  return (
    <section ref={sectionRef} className="py-12 px-6 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <p className="reveal text-center text-sm font-medium text-[#94A3B8] uppercase tracking-wider mb-8">
          Empresas que ya confían en nosotros
        </p>
        <div className="reveal flex flex-wrap justify-center items-center gap-6 md:gap-12">
          {logos.map((logo, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-[#94A3B8] hover:text-[#6C08B6] transition-colors duration-300 cursor-pointer group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-[#FC31E6]/10 group-hover:to-[#6C08B6]/10 transition-colors flex items-center justify-center font-bold text-sm group-hover:text-[#6C08B6]">
                {logo.letters}
              </div>
              <span className="font-semibold text-lg hidden sm:block">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
