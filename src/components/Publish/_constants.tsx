import React from 'react'
import { allowDynamicPricing, allowFixedPricing } from '../../../app.config.js'
import { FormPublishData, PublishFeedback, StepContent } from './_types'
import content from '../../../content/publish/form.json'
import PricingFields from './Pricing'
import MetadataFields from './Metadata'
import ServicesFields from './Services'
import Preview from './Preview'
import Submission from './Submission'
import { ServiceComputeOptions } from '@oceanprotocol/lib'

export const wizardSteps: StepContent[] = [
  {
    step: 1,
    title: content.metadata.title,
    component: <MetadataFields />
  },
  {
    step: 2,
    title: content.services.title,
    component: <ServicesFields />
  },
  {
    step: 3,
    title: content.pricing.title,
    component: <PricingFields />
  },
  {
    step: 4,
    title: content.preview.title,
    component: <Preview />
  },
  {
    step: 5,
    title: content.submission.title,
    component: <Submission />
  }
]

export const computeEnvironmentDefaults: ServiceComputeOptions = {
  namespace: 'ocean-compute',
  cpu: 1,
  gpu: 0,
  gpuType: '',
  memory: '1Gb',
  volumeSize: '1Gb',
  allowRawAlgorithm: false,
  allowNetworkAccess: true,
  publisherTrustedAlgorithmPublishers: null,
  publisherTrustedAlgorithms: null
}

export const initialValues: FormPublishData = {
  user: {
    stepCurrent: 1,
    chainId: 1,
    accountId: ''
  },
  metadata: {
    nft: { name: '', symbol: '', description: '', image_data: '' },
    type: 'dataset',
    name: '',
    author: '',
    description: '',
    tags: '',
    termsAndConditions: false,
    dockerImage: '',
    dockerImageCustom: '',
    dockerImageCustomTag: '',
    dockerImageCustomEntrypoint: ''
  },
  services: [
    {
      files: [{ url: '' }],
      links: [{ url: '' }],
      dataTokenOptions: { name: '', symbol: '' },
      timeout: '',
      access: '',
      providerUrl: {
        url: 'https://provider.mainnet.oceanprotocol.com',
        valid: true
      },
      computeOptions: computeEnvironmentDefaults
    }
  ],
  pricing: {
    price: 1,
    type:
      allowDynamicPricing === 'true'
        ? 'dynamic'
        : allowFixedPricing === 'true'
        ? 'fixed'
        : 'free',
    amountDataToken: allowDynamicPricing === 'true' ? 50 : 1000,
    amountOcean: 50,
    weightOnOcean: '5', // 50% on OCEAN
    weightOnDataToken: '5', // 50% on datatoken
    swapFee: 0.1 // in %
  }
}

export interface MetadataAlgorithmContainer {
  entrypoint: string
  image: string
  tag: string
  checksum: string
}

export const algorithmContainerPresets: MetadataAlgorithmContainer[] = [
  {
    image: 'node',
    tag: 'latest',
    entrypoint: 'node $ALGO',
    checksum: '' // TODO: how to get? Most likely needs to be fetched from DockerHub.
  },
  {
    image: 'python',
    tag: 'latest',
    entrypoint: 'python $ALGO',
    checksum: ''
  }
]

export const initialPublishFeedback: PublishFeedback = {
  1: {
    name: 'Create Tokens & Pricing',
    description:
      'The Data NFT representing your asset, the Datatokens defining access to it, and the pricing schema are all created in one transaction.',
    status: 'pending',
    txCount: 1
  },
  2: {
    name: 'Construct & Encrypt DDO',
    description:
      'The file URLs are encrypted, and the whole DDO is encrypted too.',
    status: 'pending',
    txCount: 0
  },
  3: {
    name: 'Publish DDO',
    description:
      'The encrypted DDO is stored on-chain as part of the Data NFT. Indexers like Aquarius can decrypt the DDO for displaying purposes, but the file URLs can only be decrypted by exchanging the respective datatokens for this asset.',
    status: 'pending',
    txCount: 1
  }
}
