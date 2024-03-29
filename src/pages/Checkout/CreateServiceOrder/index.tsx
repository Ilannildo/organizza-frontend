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

  const { handleCreateServiceOrder } = useEventCheckout();

  useEffect(() => {
    if (ticketId) {
      handleCreateServiceOrder({
        ticketId,
      })
        .then((res) => {
          if (res) {
            navigate(
              `/evento/${slug}/checkout/${res.service_order_id}/address`
            );
          }
        })
        .catch((err: any) => {
          if (err.response) {
            toast.warning(err.response.data.error.message);
          } else {
            toast.error("Ocorreu um problema ao realizar o pagamento");
          }
          navigate(`/evento/${slug}`);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketId, slug, navigate]);

  return <Loader isLoading />;
};

export default CreateServiceOrder;
