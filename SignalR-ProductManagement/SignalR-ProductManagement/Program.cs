using API;
using SignalR_ProductManagement.Data;
using SignalR_ProductManagement.SignalR;
var builder = WebApplication.CreateBuilder(args);

var apiPolicy = "SignalR-policy";

builder.Services.AddInfrastructureService();
builder.Services.AddWebAPIService();
builder.Services.AddCors(options =>
{
    options.AddPolicy(apiPolicy, policy =>
    {
        policy.WithOrigins("http://localhost:3000")
       .AllowAnyMethod()
       .AllowAnyHeader()
       .AllowCredentials();
    });
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(apiPolicy);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseApplicationHubs();

    app.Run();