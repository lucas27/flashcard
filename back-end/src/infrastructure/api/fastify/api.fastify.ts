import Fastify, { FastifyInstance, HTTPMethods } from "fastify";
import { APi } from "../api";
import { Route } from "./routes/route";

type Routes = {
    path: string,
    method: HTTPMethods[] | HTTPMethods
}[]

export class ApiFastify implements APi {
    private app: FastifyInstance;
    private routes: Routes = []; 
    
    private constructor(routes: Route[]){
        this.app = Fastify({ logger: true });
        this.listRoutes();
        this.addRoutes(routes);
    }

    public static create(routes: Route[]) {
        return new ApiFastify(routes);
    }

    private addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();
            
            this.app.route({
                method: method,
                url: path,
                handler: handler
            });
        });
    }

    public start(port: number) {
        this.app.listen({ port }, () => {
            console.log(this.routes);
            console.log(`Server running on port ${port}`);
        })
    }
    
    private listRoutes() {
        this.app.addHook('onRoute', (op) => {
            this.routes.push({
                path: op.path,
                method: op.method
            })
        })   
    }
}