import { CategoriesList } from "@/components/categories-list";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-y-8 pt-8 marge-x">
      <CategoriesList />
      {children}
    </div>
  );
};

export default PlatformLayout;
