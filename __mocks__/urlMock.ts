function mokeURL(url: string, base?: string | URL): URL {
  return new (require('url').URL)(url, base);
}

(global as any).URL = mokeURL;
