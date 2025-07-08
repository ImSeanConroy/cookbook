const InstructionSteps = ({ steps }: { steps: string[] }) => (
  <div>
    <h2 className="text-3xl mb-5 font-semibold dark:text-white">
      Cooking <span className="text-lime-500">Instructions</span>
    </h2>
    {steps.map((step, i) => (
      <div
        key={i}
        className="flex flex-row gap-6 items-center bg-zinc-100 dark:bg-zinc-900 dark:text-white p-6 md:p-8 rounded-2xl mb-5"
      >
        <p className="text-3xl font-semibold text-lime-500">
          {(i + 1).toString().padStart(2, "0")}
        </p>
        <p>{step}</p>
      </div>
    ))}
  </div>
);

export default InstructionSteps;
