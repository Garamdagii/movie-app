"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SortedMovies } from "@/components/sortedMovies";
import { NowPlaying } from "@/components/nowPlaying";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-screen gap-[24px]">
      <Header />
      <NowPlaying />
      <SortedMovies />
      <Footer />
    </div>
  );
}
