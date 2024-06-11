import Backdrop from "@/components/ui/backdrop";
import Loader from "@/components/ui/loader";

export default function Loading() {
  return (
    <Backdrop>
      <Loader title="Loading..." />
    </Backdrop>
  );
}
