import { ErrorIcon } from "./Icons/Index";

const FormRowError = ({ error }) => {
  if (error) {
    return (
      <>
        <span className="text-sm text-red-600 mt-2 ml-4">
          <div className="flex gap-2 items-center">
            {error.message}
            <ErrorIcon className="icon" />
          </div>
        </span>
      </>
    );
  } else return null;
  //   if (!error) return null;

  //   return (
  //     <>
  //       {error && (
  //         <p className="text-sm text-red-600 mt-2 ml-4">
  //           <div className="flex gap-2 items-center">
  //             {error.message}
  //             <ErrorIcon className="icon icon-sm" />
  //           </div>
  //         </p>
  //       )}
  //     </>
  //   );
};

export default FormRowError;
