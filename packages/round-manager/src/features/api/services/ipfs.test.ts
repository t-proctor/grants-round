import fetchMock from "jest-fetch-mock"
import { setupApiStore } from "./rtkTestUtils"
import { ipfsApi } from "./ipfs"
import { pinToIPFS } from "../utils"

// TODO(shavinac) the util functions are tested in `utils.test.ts`
//  should we mock them directly, or use actual implementation with MSW
jest.mock("../utils", () => ({
  ...jest.requireActual("../utils"),
  pinToIPFS: jest.fn(),
}))

const mockPinToIPFS = pinToIPFS as jest.Mock

beforeEach(() => {
  fetchMock.resetMocks()
  mockPinToIPFS.mockClear()
})

describe("saveToIPFS", () => {
  const ipfsContent = {
    content: {name: "My Cool Program"},
    metadata: {
      name: "program-metadata",
    },
  }

  test("request is correct", () => {
    mockPinToIPFS.mockResolvedValue(undefined)

    const storeRef = setupApiStore(ipfsApi)
    // @ts-ignore
    return storeRef.store.dispatch<any>(
      ipfsApi.endpoints.saveToIPFS.initiate(ipfsContent),
    )
      .then(() => {
        expect(mockPinToIPFS).toBeCalledTimes(1)
        expect(mockPinToIPFS).toBeCalledWith(ipfsContent)
      })
  })

  test("successful response", () => {
    const expectedIpfsHash = "cid"
    mockPinToIPFS.mockResolvedValue({
      IpfsHash: expectedIpfsHash,
      PinSize: 1024,
      TimeStamp: (new Date()).toISOString(),
    })

    const storeRef = setupApiStore(ipfsApi)
    // @ts-ignore
    return storeRef.store.dispatch<any>(
      ipfsApi.endpoints.saveToIPFS.initiate(ipfsContent),
    )
    .then((action: any) => {
      expect(action).toStrictEqual({data: expectedIpfsHash})
    })
  })

  test("error response", () => {
    mockPinToIPFS.mockRejectedValue("This is an error")

    const storeRef = setupApiStore(ipfsApi)
    // @ts-ignore
    return storeRef.store.dispatch<any>(
      ipfsApi.endpoints.saveToIPFS.initiate(ipfsContent),
    )
      .then((action: any) => {
        expect(action).toStrictEqual({error: "Unable to save file to IPFS" })
      })
  })
})
