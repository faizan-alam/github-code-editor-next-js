import CodeEditor from "@/components/CodeEditor/CodeEditor";
import HeroSection from "@/components/HeroSection/HeroSection";
import JsonPreview from "@/components/JsonPreview/JsonPreview";

export default function Home() {
  return (
    <>
      <HeroSection heading={"Code Editor"} description={"Edit your code"} />

      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 px-4">
          <CodeEditor />
        </div>
        <div className="w-full lg:w-1/2 px-4">
          <JsonPreview />
        </div>
      </div>
    </>
  );
}
