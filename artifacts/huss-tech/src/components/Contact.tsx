import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
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
  }

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
            Besoin d'un site ou d'un dépannage ?
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Expliquez-moi votre besoin. Je vous réponds avec une solution claire.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Glass contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-md border border-border/50 rounded-2xl p-8 shadow-lg"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">Nom</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Votre nom"
                            className="rounded-xl bg-background/70 border-border/60 focus-visible:ring-primary h-11"
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
                            className="rounded-xl bg-background/70 border-border/60 focus-visible:ring-primary h-11"
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
                          className="rounded-xl bg-background/70 border-border/60 min-h-[140px] resize-none focus-visible:ring-primary"
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
                  data-testid="button-submit-form"
                >
                  Envoyer le message
                </button>
              </form>
            </Form>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
