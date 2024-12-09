import { TwitterIcon } from "../icons/TwitterIcon";
import { Youtubeicon } from "../icons/youtube";

interface CardUi {
  head: string;
  title?: string;
  shareIcon: React.ReactElement;
  DeleteIcon: React.ReactElement;
  headIcon?: React.ReactElement;
  type: "youtube" | "x";
  link: string;
}

const linktypes = {
  youtube: "https://www.youtube.com/embed/",
  x: "x.com",
};

const getYoutubeEmbedLink = (link: string) => {
  const urlParams = new URLSearchParams(new URL(link).search);
  console.log(urlParams.get("v"));
  return `${linktypes.youtube}${urlParams.get("v")}`;
};

const replacex = (link: string) => {
  const data = link.replace("https://x.com", "https://twitter.com");
  console.log("link ",data);
  return link.replace("https://x.com", "https://twitter.com");
};

export function Cards({
  head,
  title,
  shareIcon,
  DeleteIcon,
  type,
  link,
}: CardUi) {
  return (
    <div>
      <div className=" max-w-85 bg-white rounded-md border border-gray-200 p-3 m-5 min-h-48">
        <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="text-gray-500 pr-2">
            {type == "youtube" ? <Youtubeicon/> : <TwitterIcon/>}
          </div>
          <p className="font-semibold text-[1rem]">{head}</p>
          
        </div>
        <div className="flex gap-3">
            {shareIcon} <button>{DeleteIcon}</button>
        </div>
        </div>
        <div className="pt-4">
          {type == "youtube" && (
            <iframe
              className="w-full"
              src={getYoutubeEmbedLink(link)}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type == "x" && (
            <blockquote className="twitter-tweet">
              <a href={replacex(link)}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}
