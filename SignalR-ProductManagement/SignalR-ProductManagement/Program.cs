using API;
using SignalR_ProductManagement.Data;
using SignalR_ProductManagement.SignalR;
var builder = WebApplication.CreateBuilder(args);


builder.Services.AddInfrastructureService();
builder.Services.AddWebAPIService();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});


var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseApplicationHubs();

app.Run();