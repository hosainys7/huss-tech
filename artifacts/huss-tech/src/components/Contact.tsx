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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message envoyé !",
      description: "Je vous réponds rapidement.",
    });
    form.reset();
    setOpen(false);
  }

  /* Lock body scroll when modal is open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Section ── */}
      <section id="contact" className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center flex flex-col items-center gap-7"
          >
            <p className="text-xs font-semibold text-primary uppercase tracking-widest">
              Contact
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight leading-[1.15] max-w-xl">
              Besoin d'un site ou d'un dépannage ?
            </h2>
            <p className="text-muted-foreground text-base max-w-md leading-relaxed">
              Expliquez-moi votre besoin. Je vous réponds avec une solution claire.
            </p>

            <motion.button
              onClick={() => setOpen(true)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="bg-primary text-white px-10 py-4 rounded-2xl font-semibold text-base shadow-md hover:bg-primary/90 transition-colors"
            >
              On y va !
            </motion.button>
          </motion.div>

        </div>
      </section>

      {/* ── Modal ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 pointer-events-none"
            >
              <div
                className="relative w-full max-w-lg bg-background rounded-2xl shadow-2xl border border-border/50 p-8 pointer-events-auto max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-foreground/50 hover:text-foreground hover:bg-foreground/8 transition-colors"
                  aria-label="Fermer"
                >
                  <X size={16} />
                </button>

                <h3 className="text-xl font-semibold text-foreground mb-1">
                  Parlez-moi de votre projet
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
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
                            <FormLabel className="text-sm font-medium text-foreground">Nom</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Votre nom"
                                className="rounded-xl bg-background border-border/60 focus-visible:ring-primary h-11"
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
                            <FormLabel className="text-sm font-medium text-foreground">Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="votre@email.com"
                                className="rounded-xl bg-background border-border/60 focus-visible:ring-primary h-11"
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
                          <FormLabel className="text-sm font-medium text-foreground">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Décrivez votre besoin..."
                              className="rounded-xl bg-background border-border/60 min-h-[130px] resize-none focus-visible:ring-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
                    >
                      Envoyer le message
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
