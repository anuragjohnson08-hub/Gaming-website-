import { CardsList } from "@/components/cards-list";

interface FeaturePageProps {
  params: {
    platform: string;
    feature: string;
  };
}

export default function FeaturePage({ params }: FeaturePageProps) {
  return (
    <div className="min-h-[640px]">
      <CardsList platform={params.platform} feature={params.feature} />
    </div>
  );
}
