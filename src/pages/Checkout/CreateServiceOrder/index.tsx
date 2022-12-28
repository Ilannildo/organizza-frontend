import { useEffect } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEventCheckout } from "../../../hooks/useEventCheckout";
import Loader from "../../../layout/Loader";

interface IParams extends Params {
  ticketId: string;
  slug: string;
}

const CreateServiceOrder = () => {
  const navigate = useNavigate();
  const { ticketId, slug } = useParams<IParams>();

  const { handleCreateServiceOrder, isCreatingServiceOrder } =
    useEventCheckout();

  useEffect(() => {
    if (ticketId) {
      handleCreateServiceOrder({
        ticketId,
      })
        .then((res) => {
          if (res) {
            navigate(`/evento/${slug}/checkout/${res.service_order_id}/payment`);
          }
        })
        .catch((err: any) => {
          if (err.response) {
            toast.error(err.response.data.error.message);
          } else {
            toast.error("Ocorreu um problema ao realizar o pagamento");
          }
          navigate(`/`);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketId, slug, navigate]);

  if (isCreatingServiceOrder) {
    return <Loader isLoading />;
  }

  return <div>Hello</div>;
};

export default CreateServiceOrder;
