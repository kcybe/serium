import SpringTransition from "@/components/animations/spring-transition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <SpringTransition>{children}</SpringTransition>;
}
