import React from "react";
import { motion } from "framer-motion";

export default function Pricing() {
  const webPricing = [
    { title: "Création de site web", price: "À partir de 300 €", features: ["Forfait clair", "Paiement possible en 2 fois"] },
    { title: "Landing page", price: "300–500 €", features: ["Site 1 page", "Idéal pour présenter rapidement une activité", "Adapté aux petits commerces et indépendants"] },
    { title: "Site vitrine", price: "600–900 €", features: ["3 à 5 pages", "Présentation complète de l'activité", "Design professionnel et adapté mobile"] },
    { title: "Maintenance mensuelle", price: "30 €/mois", features: ["Petites modifications", "Suivi du site", "Support de base"] },
    { title: "Ajout de contenu / modification", price: "30–40 €/h", features: ["Modification de texte", "Ajout d'images ou sections", "Ajustements visuels"] },
  ];

  const supportPricing = [
    { title: "Diagnostic + devis", price: "25 €", features: ["Analyse du problème", "Devis clair avant intervention", "Déduit si réparation effectuée"] },
    { title: "Dépannage logiciel / virus", price: "40–60 €", features: ["Suppression virus", "Résolution bugs logiciels", "Optimisation système"] },
    { title: "Réinstallation Windows", price: "60–80 €", features: ["Réinstallation propre", "Configuration de base", "Préparation de l'ordinateur à l'utilisation"] },
    { title: "Remplacement pièce", price: "40–60 € + pièce", features: ["Remplacement selon diagnostic", "Main d'œuvre séparée du prix de la pièce", "Intervention claire avant validation"] },
    { title: "Déplacement à Marseille", price: "Gratuit", features: ["Pour les professionnels à Marseille", "Selon disponibilité", "Sur rendez-vous"] },
  ];

  return (
    <section id="tarifs" className="py-24 bg-card">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4"
          >
            Tarifs simples et transparents
          </motion.h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-6"></div>
          <p className="text-muted-foreground text-lg">
            Tous les tarifs sont indiqués à titre indicatif. Un devis clair est établi avant toute intervention.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Sites Web */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="bg-primary text-primary-foreground py-4 px-6 rounded-xl font-serif text-2xl font-bold tracking-wider mb-2">
              Sites web
            </div>
            
            {webPricing.map((item, i) => (
              <div key={i} className="bg-background border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-3">
                  <h3 className="font-serif text-xl font-semibold text-foreground">{item.title}</h3>
                  <span className="text-primary font-bold text-lg whitespace-nowrap">{item.price}</span>
                </div>
                <ul className="space-y-1">
                  {item.features.map((feature, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-1 text-xs">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Support informatique */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="bg-primary text-primary-foreground py-4 px-6 rounded-xl font-serif text-2xl font-bold tracking-wider mb-2">
              Support informatique
            </div>
            
            {supportPricing.map((item, i) => (
              <div key={i} className="bg-background border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-3">
                  <h3 className="font-serif text-xl font-semibold text-foreground">{item.title}</h3>
                  <span className="text-primary font-bold text-lg whitespace-nowrap">{item.price}</span>
                </div>
                <ul className="space-y-1">
                  {item.features.map((feature, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-1 text-xs">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
