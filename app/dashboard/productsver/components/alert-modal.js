"use client";
import React, { useEffect, useState } from "react";
import Modal from "../../../../components/ui/modal";
import { Button } from "@/components/ui/button";

const AlertModal = ({ isOpen, onClose, onConfirm, loading }) => {
  const [isMounted, setIsMounted] = useState();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <Modal
        title="Are You Sure??"
        description="this action cant be Undone"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button disabled={loading} variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={loading} variant="destructive" onClick={onConfirm}>
            Continue
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AlertModal;
