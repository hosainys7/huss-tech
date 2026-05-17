import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaWhatsapp } from "react-icons/fa";
import { Phone, Mail } from "lucide-react";
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
  telephone: z.string().optional(),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      email: "",
      telephone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message envoyé !",
      description: "Je vous réponds rapidement.",
      className: "bg-primary text-primary-foreground border-none",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 bg-card">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4"
          >
            Besoin d'un site web ou d'un support informatique ?
          </motion.h2>
          <p className="text-muted-foreground text-lg">
            Expliquez-moi votre besoin et je vous réponds avec une solution claire.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
          <a
            href="https://wa.me/33600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm"
          >
            <FaWhatsapp size={20} />
            WhatsApp
          </a>
          <a
            href="tel:+33600000000"
            className="border border-primary text-primary px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors shadow-sm bg-background"
          >
            <Phone size={20} />
            +33 6 00 00 00 00
          </a>
          <a
            href="mailto:contact@huss-tech.fr"
            className="border border-primary text-primary px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors shadow-sm bg-background"
          >
            <Mail size={20} />
            contact@huss-tech.fr
          </a>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-background border border-border p-8 md:p-10 rounded-2xl shadow-sm max-w-2xl mx-auto"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom" className="bg-card border-border focus-visible:ring-primary" {...field} />
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
                      <FormLabel className="text-foreground">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="votre@email.com" className="bg-card border-border focus-visible:ring-primary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Téléphone <span className="text-muted-foreground font-normal">(Optionnel)</span></FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="06 00 00 00 00" className="bg-card border-border focus-visible:ring-primary" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Expliquez-moi votre besoin..." 
                        className="bg-card border-border min-h-[150px] resize-y focus-visible:ring-primary" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button 
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-sm"
                data-testid="button-submit-form"
              >
                Envoyer le message
              </button>
            </form>
          </Form>
        </motion.div>

      </div>
    </section>
  );
}
