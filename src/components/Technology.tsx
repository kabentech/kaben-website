import React from 'react';
import { motion } from 'framer-motion';

const stack = [
  { category: 'Cloud', items: ['AWS', 'Azure', 'Google Cloud'] },
  { category: 'Data Platforms', items: ['Databricks', 'Microsoft Fabric', 'Snowflake', 'BigQuery'] },
  { category: 'Data Engineering', items: ['Python', 'PySpark', 'Apache Spark', 'SQL'] },
  { category: 'Data Transformation', items: ['dbt'] },
  { category: 'Orchestration & Integration', items: ['Airflow', 'Data Factory', 'Kafka', 'Airbyte', 'Fivetran'] },
  { category: 'Analytics', items: ['Power BI', 'Tableau', 'Looker'] },
  { category: 'AI', items: ['MLflow', 'Azure AI', 'LLMs', 'RAG', 'AI Agents'] },
];

export default function Technology() {
  return (
    <section id="tech" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h3 className="text-2xl font-bold">Tecnologias que usamos para transformar dados em resultados</h3>
          <p className="mt-4 text-gray-300 max-w-2xl">Trabalhamos com o Modern Data Stack e as principais plataformas de nuvem, IA e automação — a tecnologia certa para cada desafio, não um catálogo de ferramentas.</p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stack.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-gray-800 p-6 bg-gradient-to-b from-white/3 to-transparent"
            >
              <div className="text-sm font-semibold text-[#7EE7FF]">{group.category}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="text-xs text-gray-300 px-3 py-1 rounded-full border border-gray-800 bg-[#0f1724]">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

