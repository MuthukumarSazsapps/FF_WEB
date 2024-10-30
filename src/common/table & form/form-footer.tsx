import React, { useState } from 'react';
import { cn } from 'utils';
import Button from 'common/button';
import { Modal } from 'rizzui';

interface FormFooterProps {
  className?: string;
  altBtnText?: string;
  delBtnText?: string;
  submitBtnText?: string;
  isLoading?: boolean;
  updateDisable?: boolean;
  currentStep?: number;
  handleDelBtn?: () => void;
  handleAltBtn?: () => void;
  handleNextBtn?: () => void;
  handlePrevBtn?: () => void;
}

export const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';

export default function FormFooter({
  isLoading,
  altBtnText = 'Save as Draft',
  submitBtnText = 'Submit',
  handleDelBtn,
  delBtnText,
  currentStep,
  updateDisable = false,
  className,
  handleAltBtn,
  handleNextBtn,
  handlePrevBtn,
}: FormFooterProps) {
  const [modalState, setModalState] = useState(false);

  return (
    <div
      className={cn(
        'sticky bottom-0 left-0 right-0 -mb-8 flex items-center gap-4 border-t bg-white px-4 py-4 dark:bg-gray-50 md:px-5 lg:px-6 3xl:px-8 4xl:px-10',
        className,
        negMargin,
      )}>
      {delBtnText && (
        <Button
          label={delBtnText}
          color="danger"
          type="button"
          onClick={() => setModalState(true)}
        />
      )}
      <div className="grow"></div>
      {altBtnText && (
        <Button
          label={altBtnText}
          color="DEFAULT"
          variant="outline"
          className="w-full justify-self-end @xl:w-auto"
          onClick={handleAltBtn}
        />
      )}
      {currentStep === 2 && <Button label="Prev" onClick={handlePrevBtn} />}
      {currentStep === 1 && <Button label="Next" onClick={handleNextBtn} />}

      {(!currentStep || currentStep === 2) && (
        <Button
          label={submitBtnText}
          disabled={updateDisable}
          className="dark:bg-blue-600"
          type="submit"
          isLoading={isLoading}
        />
      )}
      <Modal isOpen={modalState} onClose={() => setModalState(false)}>
        <div className="m-auto flex flex-col justify-center items-center p-10 h-full">
          <h4>Are you sure you want to delete ?</h4>
          <div className="mt-6 flex gap-4">
            <Button label="Cancel" color="info" onClick={() => setModalState(false)} />
            <Button
              label="Delete"
              color="danger"
              onClick={() => {
                if (handleDelBtn) {
                  handleDelBtn();
                }
                setModalState(false);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
