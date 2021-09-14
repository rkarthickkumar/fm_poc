import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner";
import {
  ThemeProvider as FreemiumThemeProvider,
  UiProvider as FreemiumUiProvider,
} from "freemium-ui";

export default function Home() {
  return (
    <FreemiumThemeProvider theme={{}}>
      <FreemiumUiProvider>
        <Banner />
      </FreemiumUiProvider>
    </FreemiumThemeProvider>
  );
}
