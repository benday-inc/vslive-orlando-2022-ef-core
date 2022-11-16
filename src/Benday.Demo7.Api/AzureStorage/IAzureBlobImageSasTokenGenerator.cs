using System;

namespace Benday.Demo7.Api.AzureStorage
{
    public interface IAzureBlobImageSasTokenGenerator
    {
        Uri GetBlobUriWithSasToken(string containerName, string blobName);
        Uri GetBlobUri(string containerName, string blobName);
    }
}
