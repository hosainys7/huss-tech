import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/LandingPage";

function Router() {
  return (
    <Switch>
      <Route path="/">
        <LandingPage />
      </Route>
      <Route path="/services">
        <LandingPage initialSection="services" />
      </Route>
      <Route path="/a-propos">
        <LandingPage initialSection="apropos" />
      </Route>
      <Route path="/processus">
        <LandingPage initialSection="processus" />
      </Route>
      <Route path="/contact">
        <LandingPage initialSection="contact" />
      </Route>
      <Route path="/faq">
        <LandingPage initialSection="faq" />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

type AppProps = {
  ssrPath?: string;
};

function App({ ssrPath }: AppProps) {
  return (
    <WouterRouter
      base={import.meta.env.BASE_URL.replace(/\/$/, "")}
      ssrPath={ssrPath}
    >
      <Router />
      <Toaster />
    </WouterRouter>
  );
}

export default App;
