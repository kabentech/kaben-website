import React from 'react';
import { motion } from 'framer-motion';

const useCases = [
  {
    title: 'Automatização de processos financeiros',
    problem: 'Conciliações e fechamentos manuais, sujeitos a erro.',
    solution: 'Workflows automatizados com validação e alertas.',
    tech: 'Automation • APIs • Orquestração',
    result: 'Menos retrabalho e fechamento mais rápido.',
  },
  {
    title: 'Integração de dados de múltiplas fontes',
    problem: 'ERP, CRM e planilhas isolados, sem visão única.',
    solution: 'Pipelines de ingestão e integração centralizada.',
    tech: 'Data Integration • ETL/ELT',
    result: 'Uma base única e confiável para toda a empresa.',
  },
  {
    title: 'Construção de Data Lake / Lakehouse',
    problem: 'Dados brutos sem estrutura para análise ou IA.',
    solution: 'Arquitetura de lakehouse com camadas de qualidade.',
    tech: 'Databricks • Microsoft Fabric • Delta Lake',
    result: 'Base pronta para BI e modelos de IA.',
  },
  {
    title: 'Modernização de pipelines',
    problem: 'Processos batch lentos e difíceis de manter.',
    solution: 'Reengenharia com orquestração e observabilidade.',
    tech: 'PySpark • Airflow • dbt',
    result: 'Pipelines mais rápidos, confiáveis e fáceis de evoluir.',
  },
  {
    title: 'Dashboards executivos',
    problem: 'Decisões baseadas em planilhas desatualizadas.',
    solution: 'Modelagem analítica e dashboards self-service.',
    tech: 'dbt • Power BI',
    result: 'Decisões mais rápidas com dados em tempo real.',
  },
  {
    title: 'Previsão de demanda',
    problem: 'Estoque e compras baseados em intuição.',
    solution: 'Modelos preditivos sobre dados históricos.',
    tech: 'Machine Learning • MLflow',
    result: 'Menos ruptura e menos excesso de estoque.',
  },
  {
    title: 'RAG sobre documentos corporativos',
    problem: 'Conhecimento disperso em documentos internos.',
    solution: 'Busca inteligente com IA generativa sobre a base documental.',
    tech: 'RAG • LLMs • Vector DB',
    result: 'Respostas rápidas e precisas para o time interno.',
  },
  {
    title: 'AI Agents para processos',
    problem: 'Tarefas repetitivas que exigem julgamento simples.',
    solution: 'Agentes de IA que executam etapas do processo com supervisão humana.',
    tech: 'AI Agents • Human-in-the-loop',
    result: 'Times focados em decisões de maior valor.',
  },
  {
    title: 'Conciliação e alertas inteligentes',
    problem: 'Divergências identificadas tarde demais.',
    solution: 'Monitoramento automatizado com alertas em tempo real.',
    tech: 'Automation • Observabilidade',
    result: 'Problemas identificados e corrigidos mais cedo.',
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="py-24 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold">Casos de uso</h2>
          <p className="mt-3 text-gray-400 max-w-2xl">Exemplos de como aplicamos dados, IA e automação a desafios reais de negócio.</p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((u, i) => (
            <motion.div
              key={u.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-xl border border-gray-800 bg-[#0b0b0d] flex flex-col"
            >
              <h3 className="font-semibold">{u.title}</h3>
              <dl className="mt-4 space-y-2 text-xs text-gray-400">
                <div><dt className="inline text-gray-500">Problema: </dt><dd className="inline text-gray-300">{u.problem}</dd></div>
                <div><dt className="inline text-gray-500">Solução: </dt><dd className="inline text-gray-300">{u.solution}</dd></div>
                <div><dt className="inline text-gray-500">Tecnologia: </dt><dd className="inline text-gray-300">{u.tech}</dd></div>
                <div><dt className="inline text-gray-500">Resultado: </dt><dd className="inline text-[#7EE7FF]">{u.result}</dd></div>
              </dl>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
