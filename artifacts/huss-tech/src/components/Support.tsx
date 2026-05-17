import React from "react";
import { motion } from "framer-motion";

export default function Support() {
  return (
    <section id="support" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-6"
          >
            Interventions informatiques
          </motion.h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Un support simple et pratique pour résoudre les problèmes courants de vos ordinateurs personnels ou professionnels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border/50 p-8 rounded-xl hover:-translate-y-1 transition-transform duration-300"
          >
            <h3 className="font-serif text-xl font-bold text-primary mb-3">Diagnostic ordinateur</h3>
            <p className="text-foreground/80 leading-relaxed text-sm">
              Analyse du problème, vérification de l'état de l'ordinateur et proposition d'une solution claire.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border/50 p-8 rounded-xl hover:-translate-y-1 transition-transform duration-300"
          >
            <h3 className="font-serif text-xl font-bold text-primary mb-3">Dépannage logiciel</h3>
            <p className="text-foreground/80 leading-relaxed text-sm">
              Résolution des lenteurs, bugs, virus, erreurs système et problèmes logiciels.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border/50 p-8 rounded-xl hover:-translate-y-1 transition-transform duration-300"
          >
            <h3 className="font-serif text-xl font-bold text-primary mb-3">Installation & remplacement</h3>
            <p className="text-foreground/80 leading-relaxed text-sm">
              Réinstallation Windows, configuration de logiciels et remplacement de pièces selon le besoin.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
