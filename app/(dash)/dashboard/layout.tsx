import { Integrations } from "@/components/providers/integrations";
import Middleware from "@/components/providers/middleware";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Middleware>
      <Integrations>
        <main>{children}</main>
      </Integrations>
    </Middleware>
  );
}
