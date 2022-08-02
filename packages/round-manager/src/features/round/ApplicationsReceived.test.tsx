import { Provider } from "react-redux"
import { store } from "../../app/store";
import ApplicationsReceived from "./ApplicationsReceived";
import { render, screen } from "@testing-library/react";
import { useWallet } from "../common/Auth";
import { useListGrantApplicationsQuery } from "../api/services/grantApplication"
import history from "../../history";
import { ReduxRouter } from "@lagunovsky/redux-react-router";

jest.mock("../common/Auth");

jest.mock("../api/services/grantApplication");

const mockApplicationData = [
  {
    project: {
      id: "1",
      metaPtr: {
        protocol: 1,
        pointer: "bafybeih2pise44gkkzj7fdws3knwotppnh4x2gifnbxjtttuv7okw4mjzu"
      },
      title: "Some Title 1",
      description: "Some project description 1",
      payoutAddress: "0xSomeAddress"
    },
    status: "PENDING",
    id: "1",
    projectsMetaPtr: "bafybeih2pise44gkkzj7fdws3knwotppnh4x2gifnbxjtttuv7okw4mjzu"
  },
  {
    project: {
      id: "2",
      metaPtr: {
        protocol: 1,
        pointer: "bafybeiceggy6uzfxsn3z6b2rraptp3g2kx2nrwailkjnx522yah43g5tyu"
      },
      title: "Some Title 2",
      description: "Some project description 2",
      payoutAddress: null
    },
    status: "PENDING",
    id: "2",
    projectsMetaPtr: "bafybeiceggy6uzfxsn3z6b2rraptp3g2kx2nrwailkjnx522yah43g5ty"
  },
  {
    project: {
      id: "3",
      metaPtr: {
        protocol: 1,
        pointer: "bafybeiekytxwrrfzxvuq3ge5glfzlhkuxjgvx2qb4swodhqd3c3mtc5jay"
      },
      title: "Some Title 3",
      description: "Some project description 3",
      payoutAddress: "0xSomeAddress3"
    },
    status: "PENDING",
    id: "3",
    projectsMetaPtr: "bafybeiekytxwrrfzxvuq3ge5glfzlhkuxjgvx2qb4swodhqd3c3mtc5jay"
  }
];

test("should display 3 Applications received", async () => {
  (useWallet as jest.Mock).mockReturnValue({ chain: {} });
  (useListGrantApplicationsQuery as jest.Mock).mockReturnValue({
    data: mockApplicationData,
    isLoading: false,
    isSuccess: true
  });
  render(
    <Provider store={store}>
      <ReduxRouter history={history} store={store}>
        <ApplicationsReceived></ApplicationsReceived>
      </ReduxRouter>
    </Provider>
  );

  expect(await screen.findAllByTestId("application-card")).toHaveLength(3);

  for (const application of mockApplicationData) {
    await screen.findByText(application.project.title);
    await screen.findByText(application.project.description);
  }

  expect(useListGrantApplicationsQuery).toBeCalledWith({ status: "PENDING" });
});
