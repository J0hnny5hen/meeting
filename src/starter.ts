export default async function starter(...tasks: (() => Promise<any>)[]) {
  for (let i = 0; i < tasks.length; i++) {
    await tasks[i]()
  }
}
