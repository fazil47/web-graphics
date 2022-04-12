import Page from "../../Page";
import { ReflectionDemo, ShadowDemo } from "./LightingDemos";

export default function Lighting() {
  return (
    <Page pageName="lighting">
      <h1>Lighting</h1>
      <h2>Shadows</h2>
      <ShadowDemo />
      <h2>Reflections</h2>
      <ReflectionDemo />
    </Page>
  );
}
