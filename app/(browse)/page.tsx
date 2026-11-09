import { CardsList } from "@/components/cards-list";
import { CategoriesList } from "@/components/categories-list";
import { HerosComponent } from "@/components/hero-switcher";

export default function HomePage() {
  return (
    <>
      <HerosComponent />
      <div className="flex flex-col gap-y-8 pt-8 marge-x">
        <CategoriesList />
        <div className="min-h-[640px]">
          <CardsList platform="ios" feature="apps" />
        </div>
      </div>
    </>
  );
}
