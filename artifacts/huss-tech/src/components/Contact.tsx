import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  nom: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export default function Contact() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { nom: "", email: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "77ad15e5-7c9a-4c1c-8196-9e44af49726c",
          subject: "Nouveau message de contact — Huss Tech",
          from_name: "Site Huss Tech",
          replyto: values.email,
          name: values.nom,
          email: values.email,
          message: values.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Message envoyé !", description: "Je vous réponds rapidement." });
        form.reset();
        setOpen(false);
      } else {
        toast({
          title: "Erreur d'envoi",
          description: data.message || "Veuillez réessayer ou me contacter via WhatsApp.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Erreur réseau",
        description: "Impossible de joindre le serveur. Contactez-moi via WhatsApp.",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Section ── */}
      <section
        id="contact"
        className="py-24"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(90,5,5,0.18) 0%, transparent 65%), #080808",
        }}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center flex flex-col items-center gap-7"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "rgba(200,55,55,0.85)" }}>
              Contact
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15] max-w-xl"
              style={{ color: "rgba(255,255,255,0.48)" }}>
              Besoin d'un site ou d'un dépannage&nbsp;?
            </h2>
            <p className="text-base max-w-md leading-relaxed"
              style={{ color: "rgba(255,255,255,0.42)" }}>
              Expliquez-moi votre besoin. Je vous réponds avec une solution claire.
            </p>

            <motion.button
              onClick={() => setOpen(true)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="px-10 py-4 rounded-2xl font-semibold text-base text-white transition-colors"
              style={{
                background: "#5A0505",
                boxShadow: "0 0 32px rgba(90,5,5,0.45), 0 4px 16px rgba(0,0,0,0.3)",
              }}
            >
              Discuter du projet !
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Modal ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 pointer-events-none"
            >
              <div
                className="relative w-full max-w-lg rounded-2xl shadow-2xl p-8 pointer-events-auto max-h-[90vh] overflow-y-auto"
                style={{
                  background: "#111114",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                  style={{ color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.06)" }}
                  aria-label="Fermer"
                >
                  <X size={16} />
                </button>

                <h3 className="text-xl font-semibold mb-1"
                  style={{ color: "rgba(255,255,255,0.92)" }}>
                  Parlez-moi de votre projet
                </h3>
                <p className="text-sm mb-6"
                  style={{ color: "rgba(255,255,255,0.42)" }}>
                  Je vous réponds rapidement avec une solution claire.
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="nom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium"
                              style={{ color: "rgba(255,255,255,0.65)" }}>
                              Nom
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Votre nom"
                                className="rounded-xl h-11"
                                style={{
                                  background: "rgba(255,255,255,0.06)",
                                  border: "1px solid rgba(255,255,255,0.12)",
                                  color: "rgba(255,255,255,0.85)",
                                }}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium"
                              style={{ color: "rgba(255,255,255,0.65)" }}>
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="votre@email.com"
                                className="rounded-xl h-11"
                                style={{
                                  background: "rgba(255,255,255,0.06)",
                                  border: "1px solid rgba(255,255,255,0.12)",
                                  color: "rgba(255,255,255,0.85)",
                                }}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium"
                            style={{ color: "rgba(255,255,255,0.65)" }}>
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Décrivez votre besoin..."
                              className="rounded-xl min-h-[130px] resize-none"
                              style={{
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                color: "rgba(255,255,255,0.85)",
                              }}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      style={{
                        background: "#5A0505",
                        boxShadow: "0 0 20px rgba(90,5,5,0.4)",
                      }}
                    >
                      {form.formState.isSubmitting ? "Envoi en cours…" : "Envoyer le message"}
                    </button>
                  </form>
                </Form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
