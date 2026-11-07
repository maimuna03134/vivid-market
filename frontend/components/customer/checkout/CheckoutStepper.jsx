import Icon from "@/components/ui/Icon";

const steps = ["Address", "Payment", "Review"];

// step = the current step (1, 2 or 3). Earlier steps show a check mark.
export default function CheckoutStepper({ step = 1 }) {
  return (
    <div className="flex items-center justify-center mb-stack-lg max-w-2xl mx-auto">
      {steps.map((label, i) => {
        const n = i + 1;
        const reached = n <= step;
        const done = n < step;
        const last = i === steps.length - 1;

        return (
          <div
            key={label}
            className={`flex flex-col items-center relative ${last ? "" : "flex-1"}`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 transition-colors ${reached
                  ? "bg-on-secondary-fixed text-white shadow-md"
                  : "bg-surface-container-high text-secondary border border-outline-variant"
                }`}
            >
              {done ? <Icon name="check" /> : n}
            </div>
            <span
              className={`text-label-md mt-2 ${reached ? "text-on-secondary-fixed" : "text-secondary"}`}
            >
              {label}
            </span>
            {!last && (
              <div
                className={`absolute top-5 left-1/2 w-full h-1 z-0 transition-colors ${done ? "bg-on-secondary-fixed" : "bg-surface-container-high"
                  }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}