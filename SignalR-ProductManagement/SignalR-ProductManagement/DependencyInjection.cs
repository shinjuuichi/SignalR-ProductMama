using SignalR_ProductManagement.Data;
using SignalR_ProductManagement.SignalR;

namespace API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureService(this IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>();
            services.AddSignalR();

            return services;
        }

        public static IServiceCollection AddWebAPIService(this IServiceCollection services)
        {
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            return services;
        }

        public static WebApplication UseApplicationHubs(this WebApplication app)
        {
            app.MapHub<ProductHub>("/productHub");
            app.MapHub<CategoryHub>("/categoryHub");

            return app;
        }
    }
}
