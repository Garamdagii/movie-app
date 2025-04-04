"use client";

import { NowPlaying, SortedMovies } from "@/components";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverPortal } from "@radix-ui/react-popover";

const data = [
  {
    titleName: "Upcoming",
    movieData: "upcoming",
  },
  {
    titleName: "Top Rated",
    movieData: "top_rated",
  },
  {
    titleName: "Popular",
    movieData: "popular",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-fit gap-[24px] ">
      <NowPlaying />
      <div className="flex flex-col gap-8 px-20 py-[52px] w-full">
        {data.map((el, index) => {
          return (
            <div key={index}>
              <SortedMovies titleName={el.titleName} movieData={el.movieData} />
            </div>
          );
        })}
      </div>
    </div>
    // <div>
    //   <Command>
    //     <CommandInput placeholder="Type a command or search..." />
    //     <Popover>
    //       <PopoverTrigger>
    //         <CommandList>
    //           <CommandEmpty>No results found.</CommandEmpty>
    //           <CommandGroup heading="Suggestions">
    //             <CommandItem>Calendar</CommandItem>
    //             <CommandItem>Search Emoji</CommandItem>
    //             <CommandItem>Calculator</CommandItem>
    //           </CommandGroup>
    //           <CommandSeparator />
    //           <CommandGroup heading="Settings">
    //             <CommandItem>Profile</CommandItem>
    //             <CommandItem>Billing</CommandItem>
    //             <CommandItem>Settings</CommandItem>
    //           </CommandGroup>
    //         </CommandList>
    //       </PopoverTrigger>
    //       <PopoverContent>Place content for the popover here.</PopoverContent>
    //     </Popover>
    //   </Command>
    // </div>
  );
}
