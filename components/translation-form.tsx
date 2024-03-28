"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import { Volume2Icon } from "lucide-react";

import translate from "@/actions/translate";
import { TranslationLanguages } from "@/types";
import { mimeType } from "@/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Recorder } from "@/components/recorder";

export const initialState = {
  inputLanguage: "auto",
  input: "",
  outputLanguage: "ko",
  output: "",
};

export const TranslationForm = ({
  languages,
}: {
  languages: TranslationLanguages;
}) => {
  const [state, formAction] = useFormState(translate, initialState);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const submitBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!input) return;

    const delayDebounceFn = setTimeout(() => {
      // submit the form
      submitBtnRef.current?.click();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  useEffect(() => {
    if (state.output) {
      setOutput(state.output);
    }
  }, [state]);

  const playAudio = async () => {
    const synth = window.speechSynthesis;

    if (!output || !synth) return;

    const wordsToSay = new SpeechSynthesisUtterance(output);
    synth.speak(wordsToSay);
  };

  const uploadAudio = async (blob: Blob) => {
    const file = new File([blob], mimeType, { type: mimeType });

    const formData = new FormData();
    formData.append("audio", file);

    const response = await fetch("/transcribeAudio", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.text) {
      setInput(data.text);
    }
  };

  return (
    <div>
      <form action={formAction}>
        <div className="flex space-x-2">
          <div className="flex items-center group cursor-pointer border rounded-md w-fit px-3 py-2 bg-[#E7F0FE] mb-5">
            <Image
              src="/translate_text.png"
              alt="Text Translate"
              width={30}
              height={30}
            />
            <p className="text-sm font-medium text-blue-500 group-hover:underline ml-2 mt-1">
              Text
            </p>
          </div>

          {/* Recorder */}
          <Recorder uploadAudio={uploadAudio} />
        </div>

        <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
          <div className="flex-1 space-y-2">
            <Select name="inputLanguage" defaultValue="auto">
              <SelectTrigger className="w-[280px] border-none text-blue-500 font-bold">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Want us to figure it out?</SelectLabel>
                  <SelectItem key="auto" value="auto">
                    Detect language
                  </SelectItem>
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  {Object.entries(languages.translation).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Textarea
              name="input"
              placeholder="Type your message here."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-32 text-xl"
            />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <Select name="outputLanguage" defaultValue="ko">
                <SelectTrigger className="w-[280px] border-none text-blue-500 font-bold">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Want us to figure it out?</SelectLabel>
                    <SelectItem key="auto" value="auto">
                      Detect language
                    </SelectItem>
                  </SelectGroup>

                  <SelectGroup>
                    <SelectLabel>Language</SelectLabel>
                    {Object.entries(languages.translation).map(
                      ([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value.name}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button
                variant="ghost"
                type="button"
                onClick={playAudio}
                disabled={!output}
              >
                <Volume2Icon
                  size={24}
                  className="text-blue-500 cursor-pointer disabled:cursor-not-allowed"
                />
              </Button>
            </div>

            <Textarea
              name="output"
              placeholder="Type your message here."
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="min-h-32 text-xl"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <SubmitButton disabled={!input} />
          <button type="submit" ref={submitBtnRef} hidden />
        </div>
      </form>
    </div>
  );
};
