"use client"

import { useState, useEffect, useRef } from "react"

export default function MethodologyModalImproved({ triggerLabel = "¿Cómo analizamos?" }) {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef(null)

  useEffect(() => {
    if (open) {
      const previousActive = document.activeElement
      dialogRef.current?.focus()
      document.body.style.overflow = "hidden"
      return () => {
        previousActive?.focus()
        document.body.style.overflow = ""
      }
    }
  }, [open])

  const processSteps = [
    {
      number: "01",
      title: "Auditoría inicial (30-60 min)",
      description: "Revisión rápida de tus procesos actuales para identificar tareas repetitivas que consumen tiempo y recursos.",
      deliverables: [
        "Diagnóstico preliminar sin coste",
        "Identificación de 3-5 cuellos de botella",
        "Sin compromiso de contratación"
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Mapeo de procesos clave",
      description: "Documentamos flujos de trabajo actuales y cuantificamos tiempo invertido en cada tarea.",
      deliverables: [
        "Diagrama visual de procesos",
        "Estimación de horas/semana por tarea",
        "Priorización basada en impacto/esfuerzo"
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Propuesta con impacto estimado",
      description: "Presentamos 3 acciones concretas con estimación realista de ahorro de tiempo y coste aproximado.",
      deliverables: [
        "Roadmap con 3 quick wins priorizados",
        "Estimación de ahorro (horas/mes)",
        "Presupuesto desglosado por fase"
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  const realExamples = [
    {
      sector: "Consultoría",
      problem: "Generación manual de informes semanales (3h/semana)",
      solution: "Automatización con plantillas + integración CRM",
      result: "2.5h/semana ahorradas (130h/año)"
    },
    {
      sector: "E-commerce",
      problem: "Actualización manual de inventario en 3 plataformas",
      solution: "Sincronización automática centralizada",
      result: "5h/semana ahorradas + reducción errores 80%"
    }
  ]

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-300"
        aria-haspopup="dialog"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {triggerLabel}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="methodology-title"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-[#0B0D73]/90 backdrop-blur-sm animate-fade-in"></div>

          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
            ref={dialogRef}
            tabIndex={-1}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 z-10">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Cerrar"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 id="methodology-title" className="text-2xl font-bold text-[#0B0D73] mb-2">
                Nuestra Metodología de Análisis
              </h3>
              <p className="text-[#475569]">
                Proceso transparente, rápido y orientado a resultados medibles — sin promesas vacías
              </p>
            </div>

            {/* Content */}
            <div className="px-8 py-6 space-y-8">
              {/* Process Steps */}
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#6C08B6]/30 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FC31E6] to-[#6C08B6] text-white flex items-center justify-center font-bold shadow-lg">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-[#6C08B6]">{step.icon}</div>
                        <h4 className="text-lg font-bold text-[#0B0D73]">{step.title}</h4>
                      </div>
                      <p className="text-[#475569] mb-4">{step.description}</p>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-[#334155]">Entregables:</p>
                        <ul className="space-y-1">
                          {step.deliverables.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[#475569]">
                              <svg className="w-4 h-4 text-[#FC31E6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Real Examples */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-bold text-[#0B0D73] mb-4">Ejemplos Reales de Análisis</h4>
                <p className="text-sm text-[#475569] mb-4">
                  Casos anónimos basados en análisis previos. Los resultados varían según cada negocio.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {realExamples.map((example, i) => (
                    <div key={i} className="p-4 bg-[#FC31E6]/5 rounded-lg border border-[#FC31E6]/20">
                      <span className="inline-block px-2 py-1 bg-[#6C08B6]/10 text-[#6C08B6] text-xs font-semibold rounded mb-2">
                        {example.sector}
                      </span>
                      <p className="text-sm text-[#334155] mb-2">
                        <strong>Problema:</strong> {example.problem}
                      </p>
                      <p className="text-sm text-[#334155] mb-2">
                        <strong>Solución:</strong> {example.solution}
                      </p>
                      <p className="text-sm font-semibold text-[#6C08B6]">
                        ✓ {example.result}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantee Box */}
              <div className="bg-gradient-to-r from-[#FC31E6]/10 to-[#6C08B6]/10 rounded-xl p-6 border border-[#6C08B6]/20">
                <h4 className="text-lg font-bold text-[#0B0D73] mb-2">¿Por qué esta metodología funciona?</h4>
                <ul className="space-y-2 text-sm text-[#475569]">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#FC31E6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Sin riesgo inicial:</strong> La auditoría es gratuita y sin compromiso</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#FC31E6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Enfoque cuantitativo:</strong> Medimos horas ahorradas, no "mejoras" vagas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#FC31E6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Quick wins primero:</strong> Resultados tangibles en 2-4 semanas</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#cta"
                  onClick={() => setOpen(false)}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-[#FC31E6] to-[#6C08B6] text-white rounded-xl font-bold text-center shadow-lg hover:shadow-xl transition-all"
                >
                  Solicitar Auditoría Gratuita
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="px-6 py-4 border border-gray-300 rounded-xl text-[#475569] font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
