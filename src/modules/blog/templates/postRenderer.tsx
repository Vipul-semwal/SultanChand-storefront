import RichText from "../components/richText"
import Slideshow from "../components/imageSlider"
import Quote from "../components/quote"
import Media from "../components/media"
import VideoEmbed from "../components/videoEmbed"

export function postRenderer(section: any, index: number) {
    console.log('inpostrtender',section,index)
    
  switch (section.__component) {
    case "shared.rich-text":
      return <RichText key={index} data={section} />;
    case "shared.slider":
      return <Slideshow key={index} data={section} />;
    case "shared.quote": 
      return <Quote key={index} data={section} />;
    case "shared.media":
      return <Media key={index} data={section} />;
    case "shared.video-embed":
      return <VideoEmbed key={index} data={section} />;
    default:
      return null;
  }
}