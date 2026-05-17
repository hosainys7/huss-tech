import React from "react";
import { motion } from "framer-motion";

const webItems = [
  { title: "Landing page", price: "300–500 €", desc: "Site 1 page, idéal pour présenter rapidement votre activité." },
  { title: "Site vitrine", price: "600–900 €", desc: "3 à 5 pages, design professionnel et adapté mobile." },
  { title: "Maintenance mensuelle", price: "30 €/mois", desc: "Petites modifications, suivi et support de base." },
  { title: "Ajout de contenu", price: "30–40 €/h", desc: "Textes, images, nouvelles sections." },
];

const supportItems = [
  { title: "Diagnostic + devis", price: "25 €", desc: "Déduit du montant si la réparation est effectuée." },
  { title: "Dépannage logiciel / virus", price: "40–60 €", desc: "Suppression virus, bugs, optimisation système." },
  { title: "Réinstallation Windows", price: "60–80 €", desc: "Réinstallation propre et configuration de base." },
  { title: "Remplacement pièce", price: "40–60 € + pièce", desc: "Main d'œuvre séparée du prix de la pièce." },
  { title: "Déplacement à Marseille", price: "Gratuit", desc: "Pour les professionnels, sur rendez-vous." },
];

function PriceCard({ title, price, desc }: { title: string; price: string; desc: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-border/50 last:border-0 group hover:bg-foreground/2 -mx-4 px-4 rounded-lg transition-colors">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
      </div>
      <span className="text-sm font-bold text-primary whitespace-nowrap shrink-0">{price}</span>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="tarifs" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
            Tarifs simples et transparents
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Un devis clair est établi avant toute intervention. Aucune surprise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border/60 shadow-sm p-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-base">🌐</span>
              </div>
              <h3 className="text-base font-semibold text-foreground">Sites web</h3>
            </div>
            {webItems.map((item) => (
              <PriceCard key={item.title} {...item} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border/60 shadow-sm p-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-base">🔧</span>
              </div>
              <h3 className="text-base font-semibold text-foreground">Support informatique</h3>
            </div>
            {supportItems.map((item) => (
              <PriceCard key={item.title} {...item} />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
