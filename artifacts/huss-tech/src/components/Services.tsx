import React from "react";
import { motion } from "framer-motion";
import { Globe, Wrench, Check } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4"
          >
            Des solutions simples pour votre activité
          </motion.h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-background border border-border p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-primary">
              <Globe size={32} strokeWidth={1.5} />
            </div>
            
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">Création de site web</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Des sites propres, rapides et professionnels pour présenter votre activité, vos services et faciliter le contact avec vos clients.
            </p>
            
            <ul className="space-y-3">
              {["Landing page 1 page", "Site vitrine 3–5 pages", "Adapté mobile", "Design professionnel"].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground/90 font-medium text-sm">
                  <span className="text-accent"><Check size={18} strokeWidth={3} /></span>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-background border border-border p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-primary">
              <Wrench size={32} strokeWidth={1.5} />
            </div>
            
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">Support informatique</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Assistance pratique pour ordinateurs, logiciels, lenteurs, virus, installation Windows et remplacement de pièces.
            </p>
            
            <ul className="space-y-3">
              {["Diagnostic", "Dépannage logiciel", "Réinstallation Windows", "Remplacement de pièces"].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground/90 font-medium text-sm">
                  <span className="text-accent"><Check size={18} strokeWidth={3} /></span>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
