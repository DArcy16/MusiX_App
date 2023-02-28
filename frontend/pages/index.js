/** @format */
import React from "react";
import Navbar from "@/components/Navbar";
import Carousels from "@/components/Carousels";
import Footer from "@/components/Footer";
import RecentSection from "@/components/RecentSection";
import Slider from "@/components/Slider";
import ArtistsSection from "@/components/ArtistsSection";
import HomePageLayout from "@/components/Layout/HomePageLayout";
import AddSongToPlaylistModal from "@/components/AddSongToPlaylistModal";
import { useAppContext } from "@/lib/context";
import AddPlaylistModal from "@/components/AddPlaylistModal";


export default function Home() {
  return (
    <HomePageLayout>
      <Carousels />

      <RecentSection recents={["recents", "recommend"]} />

      <Slider type="albums" />

      <Slider type="genres" />

      <ArtistsSection />

      
    </HomePageLayout>
  );
}
