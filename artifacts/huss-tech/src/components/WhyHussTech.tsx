import React from "react";
import { motion } from "framer-motion";
import { MapPin, MessageCircle, Store, Laptop } from "lucide-react";

export default function WhyHussTech() {
  const points = [
    {
      icon: <MapPin size={36} strokeWidth={1.5} />,
      title: "Basé à Marseille",
      desc: "Un interlocuteur local qui connaît le territoire.",
    },
    {
      icon: <MessageCircle size={36} strokeWidth={1.5} />,
      title: "Communication simple et directe",
      desc: "Pas de jargon complexe, juste des explications claires.",
    },
    {
      icon: <Store size={36} strokeWidth={1.5} />,
      title: "Solutions adaptées aux petits commerces",
      desc: "Idéal pour barbiers, boutiques et indépendants.",
    },
    {
      icon: <Laptop size={36} strokeWidth={1.5} />,
      title: "Sites modernes et support pratique",
      desc: "La technique à votre service, sans prise de tête.",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-foreground tracking-wide"
          >
            Pourquoi travailler avec Huss Tech ?
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {points.map((point, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center text-primary border border-border group-hover:border-accent group-hover:bg-accent/10 transition-colors mb-6">
                {point.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3 leading-tight">{point.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
