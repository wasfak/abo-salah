"use client";

import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useRef } from "react";

type CheckProps = {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({ checked, indeterminate, onChange }: CheckProps) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate || false;
    }
  }, [indeterminate]);

  return (
    <Input type="checkbox" checked={checked} ref={ref} onChange={onChange} />
  );
};

export default Checkbox;
