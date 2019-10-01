# deno-study
下一代的nodejs-deno学习

## 安装

首先安装scoop

条件:

1. PowerSheel 3++

2. .NET Framework 4.5+

查看版本号

```
$PSVersionTable.PSVersion.Major   #查看Powershell版本
$PSVersionTable.CLRVersion.Major  #查看.NET Framework版本
```

安装scoop

```
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
```

查看是否安装成功 scoop -help

安装deno scoop install deno

查看是否安装成功 deno -v
## API

### 文件操作基础

**学习前的几个知识点**

stdout, stdin, stderr的中文名字分别是标准输出，标准输入和标准错误。

在Linux下，当一个用户进程被创建的时候，系统会自动为该进程创建三个数据流，也就是题目中所提到的这三个。那么什么是数据流呢（stream）？我们知道，一个程序要运行，需要有输入、输出，如果出错，还要能表现出自身的错误。这是就要从某个地方读入数据、将数据输出到某个地方，这就够成了数据流。

#### Deno.args

返回值为一个数组，数组里面存放着当前的文件名

cat.js
```
console.log(Deno.args) //[catc.js]
```
**以下需要执行 deno cat.js test.js -A**
#### Deno.open

接收一个参数文件名

返回一个promise对象,可以拿到这个文件对应的映射id

#### Deno.resources

返回像资源ID一样的打开文件的映射以及它们的字符串表示形式。

```
console.log(Deno.args)

let fileName = Deno.args[1]

async function main() {
    console.table(Deno.resources())
    let f = await Deno.open(fileName)
    console.log(f);
    console.table(Deno.resources())
    Deno.close(4)
    console.table(Deno.resources())
}

main()

```

#### Deon.close

关闭文件id

#### Deno.copy

copy(dst: Writer, src: Reader): Promise<number>

从src复制到dst，直到src达到eof或发生错误。它返回复制的字节数和复制时遇到的第一个错误（如果有）。
因为copy（）被定义为从src读取到eof，所以它不会将read（）中的eof视为要报告的错误。

#### location.href与import.meta.url不同之处

location.href打印出的是第一次调用文件的文件路径

import.meta.url打印出的为被调用这的路径

ext.js

```
import {foo} from './ex2_foo.js'
console.log(location.href); //ext.js路径

console.log(import.meta.url); //ext.js路径
foo()
```

ext_foo.js

```
export function foo() {
    console.log('foo'+location.href); //ext.js路径

    console.log('foo'+import.meta.url); //ext_foo路径
}
```

### 网络

#### tcp
```
const {listen} = Deno
let hello = new TextEncoder().encode('hello')
async function main() {
    let s = listen({
        hostname: 'localhost',
        port: 8000,
        transport: 'tcp'
    })
    let scoket = await s.accept()
    console.log(scoket)
    console.log('listen') 
    scoket.write(hello)
}
main()
```

对于tcp协议得使用 nc来测试

#### http

```
import { serve } from "https://deno.land/std/http/server.ts";
const s = serve("0.0.0.0:8000");

async function main() {
  for await (const req of s) {
    req.respond({ body: new TextEncoder().encode("Hello World\n") });
  }
}

main();
```

